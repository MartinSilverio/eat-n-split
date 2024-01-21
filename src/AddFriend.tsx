import { CSSProperties, FormEvent, useState } from 'react';
import { NewFriend } from './types';
import { Input } from './Input';

export default function AddFriend({
    onAddFriend,
}: {
    onAddFriend: (f: NewFriend) => void;
}) {
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const style: CSSProperties = {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        backgroundColor: '#575a78',
    };

    function handleNameChange(name: string) {
        setName(name);
    }

    function handleProfilePicChange(profilePic: string) {
        setProfilePic(profilePic);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onAddFriend({ name, profilePic });
        setName('');
        setProfilePic('');
    }

    return (
        <form className="add-friend" style={style} onSubmit={handleSubmit}>
            <Input type="text" value={name} onChange={handleNameChange}>
                Friend Name
            </Input>
            <Input
                type="text"
                value={profilePic}
                onChange={handleProfilePicChange}
            >
                Image URL
            </Input>
            <button>Add</button>
        </form>
    );
}
