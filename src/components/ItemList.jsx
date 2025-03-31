import { useEffect, useState } from 'react';
import Item from './Item';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
    const [items, setItems] = useState([]);

    // Fetch items from API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URI);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Delete item handler
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URI}/${id}`, { method: 'DELETE' });
            setItems((prevItems) => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Edit item handler (for demonstration purposes)
    const handleEdit = (id) => {
        console.log(`Edit item with ID: ${id}`);
    };

    return (
        <>
            {items.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
        </>
    );
};

export default ItemList;
