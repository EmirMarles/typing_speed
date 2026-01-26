import './SubHeader.css'
import logoLarge from '../typing-speed-test-main/assets/images/logo-large.svg'
import personalBest from '../typing-speed-test-main/assets/images/icon-personal-best.svg'
import { useNavigate } from 'react-router'

export function SubHeader({ record }) {
    const navigate = useNavigate()
    const handleHomePageNavigate = () => {
        navigate('/')
    }

    return (
        <div className="header-type">
            <div className='logo-container' onClick={handleHomePageNavigate}>
                <img src={logoLarge} alt="logo large" className="logo-large" />
            </div>
            <div className='personal-best'>
                {record === 0 || record == Infinity
                    ? <p> <img src={personalBest} alt="" /><span style={{ color: 'rgb(148, 148, 151)' }}>Personal best:</span> 0</p>
                    : <p> <img src={personalBest} alt="" /><span style={{ color: 'rgb(148, 148, 151)' }}>Personal best:</span> {record}  WPM</p>
                }
            </div>
        </div>
    )
}