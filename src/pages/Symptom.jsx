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
            <h1>{symptom.Symptom}</h1>
            <p>{symptom.Description}</p>
            <Link to={`/symptoms/${id}/edit`}>Edit</Link>
        </>
    )
};