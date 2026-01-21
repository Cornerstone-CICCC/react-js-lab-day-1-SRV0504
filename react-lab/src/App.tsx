import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

export type Education = "Grade school" | "High school" | "College" | "";
export type Gender = "Male" | "Female" | "Other" | "";

export type Skill = "TypeScript" | "React" | "Node" | "NoSQL";

export type User = {
  id: string;
  fullname: string;
  age: number;
  education: Education;
  gender: Gender;
  skills: Skill[];
  bio: string;
};

export type FormData = Omit<User, "id">;

const initialFormData: FormData = {
  fullname: "",
  age: 0,
  education: "",
  gender: "",
  skills: [],
  bio: "",
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // selected user for profile "View"
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // editing id (null = add mode)
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // -------- Handlers --------

  const handleClearForm = () => {
    setFormData(initialFormData);
    setEditingUserId(null);
  };

  const handleAddOrSaveUser = () => {
    // Basic validation (optional but helpful)
    if (!formData.fullname.trim()) return;

    if (editingUserId) {
      // SAVE (update)
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId ? { ...u, ...formData, id: editingUserId } : u
        )
      );

      // If you are viewing the same user, update profile too
      setSelectedUser((prev) =>
        prev && prev.id === editingUserId ? { ...prev, ...formData } : prev
      );

      handleClearForm();
      return;
    }

    // ADD
    const newUser: User = {
      id: crypto.randomUUID(),
      ...formData,
    };

    setUsers((prev) => [newUser, ...prev]);
    handleClearForm();
  };

  const handleViewUser = (id: string) => {
    const found = users.find((u) => u.id === id) || null;
    setSelectedUser(found);
  };

  const handleEditUser = (id: string) => {
    const found = users.find((u) => u.id === id);
    if (!found) return;

    setFormData({
      fullname: found.fullname,
      age: found.age,
      education: found.education,
      gender: found.gender,
      skills: found.skills,
      bio: found.bio,
    });
    setEditingUserId(found.id);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelectedUser((prev) => (prev && prev.id === id ? null : prev));

    // If you were editing that user, reset form
    if (editingUserId === id) handleClearForm();
  };

  return (
    <>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        onSave={handleAddOrSaveUser}
        onClear={handleClearForm}
        isEditing={Boolean(editingUserId)}
      />

      <UserList
        users={users}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserProfile user={selectedUser} />
    </>
  );
};

export default App;
