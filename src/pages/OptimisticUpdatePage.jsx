import React, { useState, useRef } from 'react';
import {
    Card,
    Input,
    Button,
    List,
    Typography,
    message,
    Switch,
    Space,
    Badge,
    Divider
} from 'antd';
import {
    PlusOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const OptimisticUpdatePage = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'Công việc mẫu 1', status: 'success' },
        { id: 2, text: 'Công việc mẫu 2', status: 'success' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [shouldFail, setShouldFail] = useState(false);
    const [delay, setDelay] = useState(2000);

    // Keep track of pending items to rollback if needed
    const pendingItemsRef = useRef(new Set());

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    // Keep track of original values for rollback
    const originalValuesRef = useRef({});

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.text);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleUpdateItem = async (id) => {
        if (!editText.trim()) return;

        const originalItem = items.find(item => item.id === id);
        if (originalItem.text === editText) {
            handleCancelEdit();
            return;
        }

        // Store original value for rollback
        originalValuesRef.current[id] = originalItem.text;

        // 1. OPTIMISTIC UPDATE: Update UI immediately
        setItems(prev => prev.map(item =>
            item.id === id
                ? { ...item, text: editText, status: 'pending' }
                : item
        ));

        handleCancelEdit(); // Exit edit mode immediately

        try {
            // 2. Simulate API Call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (shouldFail) {
                        reject(new Error('Simulated API Error'));
                    } else {
                        resolve({ id, text: editText });
                    }
                }, delay);
            });

            // 3. SUCCESS
            setItems(prev => prev.map(item =>
                item.id === id
                    ? { ...item, status: 'success' }
                    : item
            ));
            message.success('Đã cập nhật thành công');

        } catch (error) {
            // 4. ERROR: Rollback
            const originalText = originalValuesRef.current[id];
            setItems(prev => prev.map(item =>
                item.id === id
                    ? { ...item, text: originalText, status: 'error' }
                    : item
            ));
            message.error('Lỗi cập nhật! (Đã hoàn tác)');
        } finally {
            delete originalValuesRef.current[id];
        }
    };

    const handleAddItem = async () => {
        if (!inputValue.trim()) return;

        const newItemText = inputValue;
        const tempId = Date.now();

        // 1. OPTIMISTIC UPDATE: Update UI immediately
        const newItem = {
            id: tempId,
            text: newItemText,
            status: 'pending'
        };

        setItems(prev => [newItem, ...prev]);
        setInputValue('');
        pendingItemsRef.current.add(tempId);

        try {
            // 2. Simulate API Call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (shouldFail) {
                        reject(new Error('Simulated API Error'));
                    } else {
                        resolve({ id: tempId, text: newItemText }); // Server returns confirmed data
                    }
                }, delay);
            });

            // 3. SUCCESS: Update item status to confirmed
            setItems(prev => prev.map(item =>
                item.id === tempId
                    ? { ...item, status: 'success' }
                    : item
            ));
            message.success('Đã lưu thành công (Server confirmed)');

        } catch (error) {
            // 4. ERROR: Rollback or show error state
            setItems(prev => prev.map(item =>
                item.id === tempId
                    ? { ...item, status: 'error' }
                    : item
            ));
            message.error('Lỗi khi lưu! (Đã hoàn tác giao diện)');

            // Optional: Remove the item after a delay to show the error state briefly
            setTimeout(() => {
                setItems(prev => prev.filter(item => item.id !== tempId));
            }, 1000);
        } finally {
            pendingItemsRef.current.delete(tempId);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <Title level={2}>
                        <ThunderboltOutlined style={{ color: '#faad14', marginRight: 8 }} />
                        Optimistic Update Demo
                    </Title>
                    <Paragraph>
                        Mô hình <strong>Optimistic UI</strong> cập nhật giao diện ngay lập tức khi người dùng thực hiện hành động,
                        giả định rằng server sẽ xử lý thành công. Nếu có lỗi, giao diện sẽ được hoàn tác (rollback).
                    </Paragraph>
                </div>

                <Card title="Cấu hình giả lập" size="small">
                    <Space size="large" wrap>
                        <Space>
                            <Text>Giả lập lỗi API:</Text>
                            <Switch
                                checked={shouldFail}
                                onChange={setShouldFail}
                                checkedChildren="Bật"
                                unCheckedChildren="Tắt"
                            />
                        </Space>
                        <Space>
                            <Text>Độ trễ (ms):</Text>
                            <Input
                                type="number"
                                value={delay}
                                onChange={e => setDelay(Number(e.target.value))}
                                style={{ width: 100 }}
                            />
                        </Space>
                    </Space>
                </Card>

                <Card title="Danh sách công việc">
                    <Space.Compact style={{ width: '100%', marginBottom: 24 }}>
                        <Input
                            placeholder="Nhập công việc mới..."
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onPressEnter={handleAddItem}
                            size="large"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddItem}
                            size="large"
                        >
                            Thêm
                        </Button>
                    </Space.Compact>

                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    editingId === item.id ? (
                                        <Space key="editing-actions">
                                            <Button
                                                type="link"
                                                size="small"
                                                onClick={() => handleUpdateItem(item.id)}
                                            >
                                                Lưu
                                            </Button>
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                onClick={handleCancelEdit}
                                            >
                                                Hủy
                                            </Button>
                                        </Space>
                                    ) : (
                                        <Button
                                            key="edit"
                                            type="link"
                                            onClick={() => handleEdit(item)}
                                            disabled={item.status === 'pending' || item.status === 'error'}
                                        >
                                            Sửa
                                        </Button>
                                    )
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        item.status === 'pending' ? (
                                            <Badge status="processing" />
                                        ) : item.status === 'success' ? (
                                            <Badge status="success" />
                                        ) : (
                                            <Badge status="error" />
                                        )
                                    }
                                    title={
                                        editingId === item.id ? (
                                            <Input
                                                value={editText}
                                                onChange={e => setEditText(e.target.value)}
                                                onPressEnter={() => handleUpdateItem(item.id)}
                                                autoFocus
                                            />
                                        ) : (
                                            <Space>
                                                <Text delete={item.status === 'error'}>{item.text}</Text>
                                                {item.status === 'pending' && (
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        <SyncOutlined spin /> Đang đồng bộ...
                                                    </Text>
                                                )}
                                                {item.status === 'error' && (
                                                    <Text type="danger" style={{ fontSize: 12 }}>
                                                        <CloseCircleOutlined /> Lỗi
                                                    </Text>
                                                )}
                                            </Space>
                                        )
                                    }
                                />
                                <div>
                                    {item.status === 'pending' && <Text type="secondary">Optimistic</Text>}
                                    {item.status === 'success' && <Text type="success">Synced</Text>}
                                    {item.status === 'error' && <Text type="danger">Failed</Text>}
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </Space>
        </div>
    );
};

export default OptimisticUpdatePage;
