import { useState } from 'react';
import { supabase } from '../App';
import { useNavigate } from "react-router-dom";

export function NewSymptom() {

    const [Symptom, setSymptom] = useState('');
    const [Description, setDescription] = useState('');
    const [Severity, setSeverity] = useState('');
    const [Duration, setDuration] = useState('');
    const [Priority, setPriority] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Symptoms').insert([{ Symptom, Description, Severity, Duration, Priority }]);
            if (error) {
                throw error;
            }
            console.log('Symptom added successfully:', data);
            setSymptom('');
            setDescription('');
            setSeverity('');
            setDuration('');
            setPriority('');
            navigate('/symptoms');
        } catch (error) {
            console.error('Error adding symptom:', error.message);
        }
    };

    return (
        <div>
            <h1>Log New Symptom</h1>
            <p>Add new symptom, behavior, or concern.</p>
            <form onSubmit={handleSubmit}>
                <div id="symptom-form" className="new-symptom-form">
                    <label>Symptom:</label>
                    <input type="text" value={Symptom} onChange={(e) => setSymptom(e.target.value)} required />
                    <br />
                </div>
                
                <div id="description-form" className="new-symptom-form">
                    <label>Description:</label>
                    <textarea value={Description} onChange={(e) => setDescription(e.target.value)} required />
                    <br />
                </div>
                
                <div id="severity-form" className="new-symptom-form">
                    <label>Severity:</label>
                    <br />

                    <input type="radio" id="severe" name="severity" value="Severe" onChange={(e) => setSeverity(e.target.value)} />
                    <label htmlFor="severe">Severe</label>
                    <br />

                    <input type="radio" id="moderate" name="severity" value="Moderate" onChange={(e) => setSeverity(e.target.value)} />
                    <label htmlFor="moderate">Moderate</label>
                    <br />

                    <input type="radio" id="mild" name="severity" value="Mild" onChange={(e) => setSeverity(e.target.value)} />
                    <label htmlFor="mild">Mild</label>
                    <br />
                </div>

                <div id="duration-form" className="new-symptom-form">
                    <label>Duration:</label>
                    <br />

                    <input type="radio" id="acute" name="duration" value="Acute" onChange={(e) => setDuration(e.target.value)} />
                    <label htmlFor="acute">Acute</label>
                    <br />

                    <input type="radio" id="chronic" name="duration" value="Chronic" onChange={(e) => setDuration(e.target.value)} />
                    <label htmlFor="chronic">Chronic</label>
                    <br />
                </div>

                <div id="priority-form" className="new-symptom-form">
                    <label>Priority:</label>
                    <select id="priority" name="priority" onChange={(e) => setPriority(e.target.value)} >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};