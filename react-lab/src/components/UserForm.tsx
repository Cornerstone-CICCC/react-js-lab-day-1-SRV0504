import type { FormData, Education, Gender, Skill } from "../App";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSave: () => void;
  onClear: () => void;
  isEditing: boolean;
};

const EDUCATION_OPTIONS: Education[] = ["Grade school", "High school", "College"];
const SKILL_OPTIONS: Skill[] = ["TypeScript", "React", "Node", "NoSQL"];
const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"];

const UserForm = ({ formData, setFormData, onSave, onClear, isEditing }: Props) => {
  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSkill = (skill: Skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <section style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <h2>{isEditing ? "Edit User" : "Add User"}</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* fullname */}
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            value={formData.fullname}
            onChange={(e) => updateField("fullname", e.target.value)}
          />
        </div>

        {/* age */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => updateField("age", Number(e.target.value))}
            min={0}
          />
        </div>

        {/* education */}
        <div>
          <label htmlFor="education">Education:</label>
          <select
            id="education"
            value={formData.education}
            onChange={(e) => updateField("education", e.target.value as Education)}
          >
            <option value="">Select...</option>
            {EDUCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* gender */}
        <div>
          <label>Gender:</label>
          <div>
            {GENDER_OPTIONS.map((g) => (
              <label key={g} style={{ marginRight: 12 }}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={() => updateField("gender", g)}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* skills */}
        <div>
          <label>Skills:</label>
          <div>
            {SKILL_OPTIONS.map((s) => (
              <label key={s} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  value={s}
                  checked={formData.skills.includes(s)}
                  onChange={() => toggleSkill(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* bio */}
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={4}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="button" onClick={onSave}>
            {isEditing ? "Save User" : "Add User"}
          </button>

          <button type="button" onClick={onClear} style={{ marginLeft: 10 }}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
