import { Link, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import { Home } from './pages/Home';
//import { About } from './pages/About';
import { SymptomList } from './pages/SymptomList';
import { Symptom } from './pages/Symptom';
import { NewSymptom } from './pages/NewSymptom';
import { EditSymptom } from './pages/EditSymptom';
import { NotFound } from './pages/NotFound';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

function App() {

    return (
        <>
            <nav id="main-navbar">
                <ul>
                    <li><Link to="/" className="navbar-links">Home</Link></li>
                    {/* <li><Link to="/about">About</Link></li> */}
                    <li><Link to="/symptoms" className="navbar-links">Symptoms</Link></li>
                    <li><Link to="/symptoms/new" className="navbar-links">New Symptom</Link></li>
                </ul>
            </nav>

            <div id="main-body">
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    {/* <Route path="/about" element={<About />} /> */}
                    <Route path="/symptoms" element={<SymptomList />} />
                    <Route path="/symptoms/:id/*" element={<Symptom />} />
                    <Route path="/symptoms/new" element={<NewSymptom />} />
                    <Route path="/symptoms/:id/edit" element={<EditSymptom />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>                
            </div>

        </>    
    )
};

export default App;
