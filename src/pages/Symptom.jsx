import { Link, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../App';

export function Symptom() {

    const { id } = useParams();

    const [symptom, setSymptom] = useState([]);

    useEffect(() => {
        const fetchSymptom = async () => {
            try {
                const { data, error } = await supabase.from('Symptoms').select('*').eq('id', id).single();
                if (error) {
                    throw error;
                }
                setSymptom(data);
            } catch (error) {
                console.error('Error fetching symptom:', error.message);
            }
        };

        fetchSymptom();
    }, [supabase, id]);

    return (
        <>
            <div id="symptom-summary">
                <h1 className="page-title">"{symptom?.Symptom}" Overview</h1>
                <p className="symptom-page-description">{symptom?.Description}</p>
            </div>
            <div id="symptom-summary-holder">
                {symptom && (
                    <div id="treated-status">
                        <p className="symptom-summary-treated">Treated: {symptom.Treated ? 'Yes' : 'No'}</p>
                    </div>
                )}
                {symptom?.Severity && <p>Severity: {symptom.Severity}</p>}
                {symptom?.Duration && <p>Duration: {symptom.Duration}</p>}
                {symptom?.Priority && <p>Priority: {symptom.Priority}</p>}
                <div id="symptom-link-holder">
                    <Link className="symptom-edit-link" id="symptom-back-link" to={`/symptoms`}>Back</Link>
                    <Link className="symptom-edit-link" to={`/symptoms/${id}/edit`}>Edit</Link>
                </div>
            </div>
        </>
    )
};