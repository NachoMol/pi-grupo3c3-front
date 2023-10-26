
import { Link } from 'react-router-dom';
import '../styless/App.css'; 


const BodyContainer = () => {
    return (
            <div className="container">
                <div className="search-section">
                    <h2>Search</h2>
                </div>
                <div className="categories-section">
                    <h2>Categories</h2>
                </div>
                <div className="recommendations-section">
                    <h2>Recomendations</h2>
                </div>                
                <Link to={'/admin'}>
                    <p>Admin</p>
                </Link>
            </div>
        
    );
};

export default BodyContainer;