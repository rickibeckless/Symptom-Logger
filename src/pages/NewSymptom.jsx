import { useState } from 'react';
import { supabase } from '../App';

export function NewSymptom() {

    const [Symptom, setSymptom] = useState('');
    const [Description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Symptoms').insert([{ Symptom, Description }]);
            if (error) {
                throw error;
            }
            console.log('Symptom added successfully:', data);
            setSymptom('');
            setDescription('');
        } catch (error) {
            console.error('Error adding symptom:', error.message);
        }
    };

    return (
        <div>
            <h1>Log New Symptom</h1>
            <p>Add new symptom, behavior, or concern.</p>
            <form onSubmit={handleSubmit}>
                <label>Symptom:</label>
                <input type="text" value={Symptom} onChange={(e) => setSymptom(e.target.value)} required />
                <br />
                <label>Description:</label>
                <textarea value={Description} onChange={(e) => setDescription(e.target.value)} required />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};