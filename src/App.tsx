import { CSSProperties, useState } from 'react';
import { NewFriend, Friend } from './types';

import FriendList from './FriendList';
import SplitBillForm from './SplitBillForm';

const initialFriendList: Friend[] = [
    {
        name: 'Clark',
        id: 1,
        balance: 0,
        profilePic: 'https://i.pravatar.cc/50?img=1',
    },
    {
        name: 'Barry',
        id: 2,
        balance: 0,
        profilePic: 'https://i.pravatar.cc/50?img=2',
    },
];

function App() {
    const [friendList, setFriendList] = useState<Friend[]>(initialFriendList);
    const [selectedFriend, setSelectedFriend] = useState(-1);
    const style: CSSProperties = {
        display: 'flex',
        gap: '20px',
        minHeight: '310px',
    };

    function handleAddFriend(newFriend: NewFriend) {
        setFriendList((curr) => [
            ...curr,
            { ...newFriend, id: Date.now(), balance: 0 },
        ]);
    }
    let friendForForm: Friend | undefined;
    if (selectedFriend !== -1) {
        friendForForm = {
            ...friendList.find((friend) => friend.id === selectedFriend),
        } as Friend;
    }

    function handleSplitFormSubmit(num: number) {
        setFriendList((currArr) => {
            return currArr.map((friend) => {
                if (friend.id === selectedFriend) {
                    return { ...friend, balance: friend.balance + num };
                }
                return friend;
            });
        });
        setSelectedFriend(-1);
    }

    return (
        <div style={style}>
            <FriendList
                friendList={friendList}
                selectedFriend={selectedFriend}
                onSelectedFriend={setSelectedFriend}
                onAddFriend={handleAddFriend}
            />
            {selectedFriend !== -1 && friendForForm && (
                <SplitBillForm
                    friend={friendForForm}
                    onSubmit={handleSplitFormSubmit}
                />
            )}
        </div>
    );
}

export interface SplitBillFormProps {
    friend: Friend;
    onSubmit: (n: number) => void;
}

export default App;
