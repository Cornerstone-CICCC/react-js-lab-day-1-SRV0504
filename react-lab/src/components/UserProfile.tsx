import type { User } from "../App";

type Props = {
  user: User | null;
};

const UserProfile = ({ user }: Props) => {
  return (
    <section style={{ padding: 20 }}>
      <h2>User Profile</h2>

      {!user ? (
        <p>Select a user and click <b>View</b>.</p>
      ) : (
        <div>
          <p><b>ID:</b> {user.id}</p>
          <p><b>Full Name:</b> {user.fullname}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Education:</b> {user.education || "N/A"}</p>
          <p><b>Gender:</b> {user.gender || "N/A"}</p>
          <p><b>Skills:</b> {user.skills.length ? user.skills.join(", ") : "None"}</p>
          <p><b>Bio:</b> {user.bio || "N/A"}</p>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
