import { useState, useEffect, useCallback } from 'react';
import './ULPanel.css';

const ESSENTIAL_SKILLS = [
    // Programming Languages
    { name: "JavaScript", category: "LANGUAGES", id: "js" },
    { name: "Python", category: "LANGUAGES", id: "py" },
    { name: "TypeScript", category: "LANGUAGES", id: "ts" },
    { name: "SQL", category: "LANGUAGES", id: "sql" },
    
    // Frontend
    { name: "React", category: "Frontend", id: "react" },
    { name: "HTML/CSS", category: "Frontend", id: "htmlcss" },
    { name: "Vue/Angular", category: "Frontend", id: "vueang" },
    
    // Backend
    { name: "Node.js", category: "Backend", id: "node" },
    { name: "REST APIs", category: "Backend", id: "rest" },
    { name: "Databases", category: "Backend", id: "db" },
    
    // DevOps & Tools
    { name: "Git", category: "DevOps", id: "git" },
    { name: "Docker", category: "DevOps", id: "docker" },
    { name: "CI/CD", category: "DevOps", id: "cicd" },
    { name: "Cloud (AWS/Azure)", category: "DevOps", id: "cloud" },
    
    // Practices
    { name: "Testing", category: "Practices", id: "testing" },
    { name: "Agile/Scrum", category: "Practices", id: "agile" },
    { name: "Code Review", category: "Practices", id: "review" },
    
    // Emerging
    { name: "AI/ML Basics", category: "Emerging", id: "aiml" },
    { name: "Security", category: "Emerging", id: "security" },
    { name: "Performance", category: "Emerging", id: "perf" }
];[
    { name: 'Databases', category: 'Backend', id: 'db' },
    
    // DevOps & Tools
    { name: 'Git', category: 'DevOps', id: 'git' },
    { name: 'Docker', category: 'DevOps', id: 'docker' },
    { name: 'CI/CD', category: 'DevOps', id: 'cicd' },
    { name: 'Cloud (AWS/Azure)', category: 'DevOps', id: 'cloud' },
    
    // Practices
    { name: 'Testing', category: 'Practices', id: 'testing' },
    { name: 'Agile/Scrum', category: 'Practices', id: 'agile' },
    { name: 'Code Review', category: 'Practices', id: 'review' },
    
    // Emerging
    { name: 'AI/ML Basics', category: 'Emerging', id: 'aiml' },
    { name: 'Security', category: 'Emerging', id: 'security' },
    { name: 'Performance', category: 'Emerging', id: 'perf' }
];

const ULPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [skillRatings, setSkillRatings] = useState({});
    const [customSkills, setCustomSkills] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [notification, setNotification] = useState(null);
    const [newSkillName, setNewSkillName] = useState('');

    useEffect(() => {
        loadSavedData();
    }, []);

    const loadSavedData = () => {
        const saved = localStorage.getItem('ul_panel_data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setSkillRatings(data.ratings || {});
                setCustomSkills(data.customSkills || []);
            } catch (e) {
                console.error('Failed to load saved data',e);
            }
        }
    };

    const saveData = useCallback(() => {
        const data = {
            ratings: skillRatings,
            customSkills,
            fileName: uploadedFile?.name || null
        };
        localStorage.setItem('ul_panel_data', JSON.stringify(data));
    }, [skillRatings, customSkills, uploadedFile]);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 2000);
    };

    const handleRating = (skillId, type, value) => {
        setSkillRatings(prev => ({
            ...prev,
            [skillId]: {
                ...prev[skillId],
                [type]: value
            }
        }));
    };

    const handleFileUpload = (file) => {
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!validTypes.includes(file.type)) {
            showNotification('INVALID FILE TYPE');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showNotification('FILE TOO LARGE');
            return;
        }
        
        setUploadedFile(file);
        showNotification('FILE UPLOADED');
    };

    const addCustomSkill = () => {
        if (!newSkillName.trim()) return;
        
        const skillName = newSkillName.trim().toUpperCase();
        const exists = [...ESSENTIAL_SKILLS, ...customSkills]
            .some(s => s.name.toUpperCase() === skillName);
        
        if (exists) {
            showNotification('SKILL ALREADY EXISTS');
            return;
        }
        
        const newSkill = {
            name: skillName,
            category: 'CUSTOM',
            id: 'custom_' + Date.now()
        };
        
        setCustomSkills(prev => [...prev, newSkill]);
        setNewSkillName('');
        showNotification('SKILL ADDED');
    };

    const generateLink = () => {
        const hasRatings = Object.keys(skillRatings).length > 0;
        
        if (!uploadedFile && !hasRatings) {
            showNotification('ADD DATA FIRST');
            return;
        }
        
        const payload = {
            timestamp: Date.now(),
            file: uploadedFile?.name || null,
            ratings: skillRatings,
            customSkills
        };
        
        const encoded = btoa(JSON.stringify(payload));
        const link = `${window.location.origin}/free-shipping/${encoded.slice(0, 20)}`;
        
        navigator.clipboard.writeText(link)
            .then(() => showNotification('LINK COPIED'))
            .catch(() => showNotification('LINK GENERATED'));
    };

    const resetAll = () => {
        if (!window.confirm('RESET ALL DATA?')) return;
        
        setSkillRatings({});
        setCustomSkills([]);
        setUploadedFile(null);
        localStorage.removeItem('ul_panel_data');
        showNotification('DATA RESET');
    };

    useEffect(() => {
        saveData();
    }, [skillRatings, customSkills, uploadedFile, saveData]);

    const SkillItem = ({ skill }) => {
        const ratings = skillRatings[skill.id] || {};
        
        return (
            <div className="ul-skill-item" data-skill-id={skill.id}>
                <div className="ul-skill-header">
                    <span className="ul-skill-name">{skill.name}</span>
                    <span className="ul-skill-category">{skill.category}</span>
                </div>
                
                <div className="ul-rating-row">
                    <span className="ul-rating-label">LEVEL:</span>
                    <div className="ul-rating-scale">
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={`level-${i}`}
                                className={`ul-rating-btn ${ratings.level === i ? 'selected' : ''}`}
                                onClick={() => handleRating(skill.id, 'level', i)}
                            >
                                {i}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="ul-rating-row">
                    <span className="ul-rating-label">IMPORTANCE:</span>
                    <div className="ul-rating-scale">
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={`importance-${i}`}
                                className={`ul-rating-btn ${ratings.importance === i ? 'selected' : ''}`}
                                onClick={() => handleRating(skill.id, 'importance', i)}
                            >
                                {i}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Always render the trigger button alongside the panel
    const renderTriggerButton = () => (
        <button 
            className="ul-trigger-btn"
            onClick={() => setIsOpen(true)}
            title="Open Skills Assessment Panel"
        >
            U/L
        </button>
    );

    return (
        <>
            {/* Trigger Button - Always visible */}
            <button 
                className="ul-trigger-btn"
                onClick={() => setIsOpen(true)}
                title="Open Skills Assessment Panel"
            >
                U/L
            </button>
            
            {/* Panel and Backdrop */}
            <div 
                className={`ul-backdrop ${isOpen ? 'ul-panel-visible' : ''}`}
                onClick={() => setIsOpen(false)}
            />
            
            <div className={`ul-panel ${isOpen ? 'ul-panel-visible' : ''}`}>
                <div className="ul-panel-header">
                    <h3>SKILLS ASSESSMENT</h3>
                    <button 
                        className="ul-panel-close"
                        onClick={() => setIsOpen(false)}
                    >
                        &times;
                    </button>
                </div>
                
                <div className="ul-panel-content">
                    <div 
                        className="ul-upload-area"
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.background = 'var(--hover)';
                        }}
                        onDragLeave={(e) => {
                            e.currentTarget.style.background = '';
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.background = '';
                            const files = e.dataTransfer.files;
                            if (files.length > 0) handleFileUpload(files[0]);
                        }}
                        onClick={() => document.getElementById('ulFileInput').click()}
                    >
                        {uploadedFile ? (
                            <>
                                <p className="ul-upload-text">✓ {uploadedFile.name.toUpperCase()}</p>
                                <p className="ul-upload-info">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                            </>
                        ) : (
                            <>
                                <p className="ul-upload-text">DROP RESUME HERE OR CLICK TO UPLOAD</p>
                                <p className="ul-upload-info">PDF OR DOCX • MAX 5MB</p>
                            </>
                        )}
                        <input
                            type="file"
                            id="ulFileInput"
                            accept=".pdf,.docx"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleFileUpload(file);
                            }}
                        />
                    </div>
                    
                    <div className="ul-skills-section">
                        <h4 className="ul-section-title">RATE YOUR SKILLS</h4>
                        <div className="ul-skills-grid">
                            {ESSENTIAL_SKILLS.map(skill => (
                                <SkillItem key={skill.id} skill={skill} />
                            ))}
                            {customSkills.map(skill => (
                                <SkillItem key={skill.id} skill={skill} />
                            ))}
                        </div>
                        
                        <div className="ul-add-skill">
                            <div className="ul-add-skill-row">
                                <input
                                    type="text"
                                    className="ul-skill-input"
                                    placeholder="ADD CUSTOM SKILL"
                                    value={newSkillName}
                                    onChange={(e) => setNewSkillName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') addCustomSkill();
                                    }}
                                />
                                <button 
                                    className="ul-add-btn"
                                    onClick={addCustomSkill}
                                >
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="ul-panel-footer">
                    <button 
                        className="ul-reset-btn"
                        onClick={resetAll}
                    >
                        RESET ALL
                    </button>
                    <button 
                        className="ul-generate-btn"
                        onClick={generateLink}
                    >
                        GENERATE LINK FOR FRIEND TO GET OUR FREE SHIPPING
                    </button>
                </div>
            </div>
            
            {notification && (
                <div className="ul-notification show">
                    {notification}
                </div>
            )}
        </>
    );
};

export default ULPanel;
