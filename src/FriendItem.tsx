interface FriendItemProps {
    name: string;
    balance: number;
    profilePic: string;
    id: number;
    selectedFriend: number;
    onSelectedFriend: (n: number) => void;
}

export default function FriendItem({
    name,
    balance,
    profilePic,
    id,
    selectedFriend,
    onSelectedFriend,
}: FriendItemProps) {
    const currentlySelected = id === selectedFriend;

    function handleClick() {
        currentlySelected ? onSelectedFriend(-1) : onSelectedFriend(id);
    }

    let message = (
        <span className="friend-balance">You and {name} are even</span>
    );
    if (balance > 0) {
        console.log('Owes me');
        message = (
            <span className="friend-balance" style={{ color: '#03f103' }}>
                {name} owes you ${balance}
            </span>
        );
    } else if (balance < 0) {
        message = (
            <span className="friend-balance" style={{ color: 'red' }}>
                You owe {name} ${Math.abs(balance)}
            </span>
        );
    }

    return (
        <li className={`friend ${currentlySelected && 'selected'}`}>
            <img className="profile-pic" src={profilePic} />
            <span className="friend-name">{name}</span>
            {message}
            <button className="select-friend" onClick={handleClick}>
                <span>{`${currentlySelected ? 'Close' : 'Select'}`}</span>
            </button>
        </li>
    );
}
