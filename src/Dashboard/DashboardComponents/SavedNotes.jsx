import React, {useEffect, useState} from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function SavedNotes({ QueryId, userId }) {
    const navigate = useNavigate();
    const [TopicName, setTopicName] = useState(null);

    useEffect(() => {
        const database = getDatabase();
        const queryRef = ref(database, `users/${userId}/Queries/${QueryId}/Query`);
        onValue(queryRef, (snapshot) => {
            const query = snapshot.val();
            setTopicName(query);
        });
    }, [userId, QueryId]);

    const handleClick = () => {
        navigate(`/index?queryId=${QueryId}`);
    };

    return (
        <div className='col-save'>
            <div className='card-save mb-4 rounded-3 shadow-sm'>
              <div className='card-body-save personal-info' onClick={handleClick}>
                <h3 className='card-title-save pricing-card-title personal-info-title'>
                  {' '}
                  {TopicName}
                </h3>
              </div>
            </div>
        </div>
    )
}

export default SavedNotes;