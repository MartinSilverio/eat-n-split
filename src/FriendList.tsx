import { useState } from 'react';
import { NewFriend, Friend } from './types';

import AddFriend from './AddFriend';
import FriendItem from './FriendItem';

interface FriendListProps {
    friendList: Friend[];
    onAddFriend: (f: NewFriend) => void;
    selectedFriend: number;
    onSelectedFriend: (n: number) => void;
}

export default function FriendList({
    friendList,
    onAddFriend,
    selectedFriend,
    onSelectedFriend,
}: FriendListProps) {
    const [isShowingFriendForm, setIsShowingFriendForm] = useState(false);

    function handleClick() {
        setIsShowingFriendForm((curr) => !curr);
    }

    function handleAddFriend(friend: NewFriend) {
        onAddFriend(friend);
    }

    return (
        <ul className="friend-list">
            {friendList.map((friend) => {
                return (
                    <FriendItem
                        key={friend.id}
                        balance={friend.balance}
                        name={friend.name}
                        profilePic={friend.profilePic}
                        id={friend.id}
                        selectedFriend={selectedFriend}
                        onSelectedFriend={onSelectedFriend}
                    />
                );
            })}
            {isShowingFriendForm && <AddFriend onAddFriend={handleAddFriend} />}

            <button onClick={handleClick}>
                {isShowingFriendForm ? 'Close' : 'Add friend'}
            </button>
        </ul>
    );
}
