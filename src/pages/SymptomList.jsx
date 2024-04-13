import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../App';

export function SymptomList() {

    const [symptoms, setSymptoms] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [priorityStats, setPriorityStats] = useState({
        Low: 0,
        Medium: 0,
        High: 0
    });

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const { data, error } = await supabase.from('Symptoms').select('*');
                if (error) {
                    throw error;
                }
                setSymptoms(data || []);
                setRowCount(data.length);
                calculatePriorityStats(data);
            } catch (error) {
                console.error('Error fetching symptoms:', error.message);
            }
        };

        fetchSymptoms();
    }, [supabase]);

    const calculatePriorityStats = (data) => {
        const stats = { Low: 0, Medium: 0, High: 0 };
        data.forEach(symptom => {
            if (symptom.Priority === "Low") {
                stats.Low++;
            } else if (symptom.Priority === "Medium") {
                stats.Medium++;
            } else if (symptom.Priority === "High") {
                stats.High++;
            }
        });

        setPriorityStats(stats);
    };

    const calculatePercentage = (count) => {
        return ((count / rowCount) * 100).toFixed(0);
    };

    return (
        <>
            <h1 className="page-title">Symptoms</h1>
            
            <div id="symptoms-stats-holder">
                <div id="total-symptoms-logged" className="stats-card">
                    <h3>Total Symptoms Logged:</h3>
                    <p>{rowCount}</p>
                </div>
                <div id="low-priority-stats" className="stats-card">
                    <h3>Low Priority:</h3>
                    <p>{priorityStats.Low} ({calculatePercentage(priorityStats.Low)}%)</p>
                </div>
                <div id="medium-priority-stats" className="stats-card">
                    <h3>Medium Priority:</h3>
                    <p>{priorityStats.Medium} ({calculatePercentage(priorityStats.Medium)}%)</p>
                </div>
                <div id="high-priority-stats" className="stats-card">
                    <h3>High Priority:</h3>
                    <p>{priorityStats.High} ({calculatePercentage(priorityStats.High)}%)</p>
                </div>
            </div>
            <div id="symptom-list-symptoms">
                {symptoms.slice().reverse().map(symptom => (
                    <div className={`symptom-card ${symptom.Treated ? 'treated-card' : ''}`} key={symptom.id}>
                        <div className="symptom-info">
                            {symptom.Treated && <p className="symptom-treated">Treated!</p>}
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