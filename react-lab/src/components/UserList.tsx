import type { User } from "../App";

type Props = {
  users: User[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const UserList = ({ users, onView, onEdit, onDelete }: Props) => {
  return (
    <section style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>ID</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Full Name</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
  {users.map((u) => (
    <tr key={u.id}>
      <td style={{ padding: "8px 0" }}>
        {u.id.slice(0, 8)}...
      </td>

      <td style={{ padding: "8px 0" }}>
        {u.fullname}
      </td>

      <td style={{ padding: "8px 0" }}>
        <button onClick={() => onView(u.id)}>View</button>
        <button onClick={() => onEdit(u.id)} style={{ marginLeft: 8 }}>
          Edit
        </button>
        <button onClick={() => onDelete(u.id)} style={{ marginLeft: 8 }}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </section>
  );
};

export default UserList;
