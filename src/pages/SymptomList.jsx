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
        <>
            <h1 className="page-title">Symptoms</h1>
            <p className="page-summary">This is the symptoms list page</p>
            <div id="symptom-list-symptoms">
                {symptoms.map(symptom => (
                    <div className="symptom-card">
                        <div className="symptom-info">
                            <Link key={symptom.id} to={`/symptoms/${symptom.id}/${encodeURIComponent(symptom.Symptom)}`} className="symptom-card-links">{symptom.Symptom}</Link>
                            <p className="symptom-description">{symptom?.Description}</p>                            
                        </div>
                        <div className="symptom-add-info">
                            {symptom?.Priority && <p>Priority: {symptom.Priority}</p>}                            
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};