import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../App';

export function EditSymptom() {

    const { id } = useParams();

    const [symptom, setSymptom] = useState(null);
    const [editedSymptom, setEditedSymptom] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    const fetchSymptom = async () => {
        try {
            const { data, error } = await supabase.from('Symptoms').select('*').eq('id', id).single();
            if (error) {
                throw error;
            }
            setSymptom(data);
            setEditedSymptom(data?.Symptom || '');
            setEditedDescription(data?.Description || '');
        } catch (error) {
            console.error('Error fetching symptom:', error.message);
        }
    };

    useEffect(() => {
        fetchSymptom();
    }, [supabase, id]);

    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            const { error } = await supabase.from('Symptoms').update({ Symptom: editedSymptom, Description: editedDescription }).eq('id', id);
            if (error) {
                throw error;
            }
            await fetchSymptom();
            console.log('Symptom updated successfully');
            navigate('/symptoms');
        } catch (error) {
            console.error('Error updating symptom:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const { error } = await supabase.from('Symptoms').delete().eq('id', id);
            if (error) {
                throw error;
            }
            console.log('Symptom deleted successfully');
            navigate('/symptoms');
        } catch (error) {
            console.error('Error deleting symptom:', error.message);
        }
    };

    return (
        <div>
            <h1>Edit {symptom?.Symptom}</h1>
            <h3>Current Description:</h3>
            <p>{symptom?.Description}</p>

            <label>Symptom:</label>
            <input type="text" onChange={(e) => setEditedSymptom(e.target.value)} />
            <br />

            <label>Description:</label>
            <textarea onChange={(e) => setEditedDescription(e.target.value)} />
            <br />

            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
};

