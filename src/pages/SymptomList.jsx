import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../App';

export function SymptomList() {

    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const { data, error } = await supabase.from('Symptoms').select('*');
                if (error) {
                    throw error;
                }
                setSymptoms(data || []);
            } catch (error) {
                console.error('Error fetching symptoms:', error.message);
            }
        };

        fetchSymptoms();
    }, [supabase]);

    return (
        <div>
            <h1>Symptoms</h1>
            <p>This is the symptoms list page</p>
            {symptoms.map(symptom => (
                <Link key={symptom.id} to={`/symptoms/${symptom.id}/${encodeURIComponent(symptom.Symptom)}`}>{symptom.Symptom}</Link>
            ))}
        </div>
    )
};