// src/components/UserInfoForm.tsx
import { useState, FormEvent } from 'react';

interface UserInfo {
    filingStatus: "single" | "marriedFilingJointly";
    income: number;
    age: number;
    dependents: number;
    students: number;
    zipCode: string;
  }

interface UserInfoFormProps {
    onSubmit: (formValues: UserInfo) => void;
  }

const filingStatusOptions = [
    { id: 'single', value: 'Single' },
    { id: 'married', value: 'Married' },
    { id: 'widow', value: 'Widow(er)' },
    // Add more statuses as required
  ];

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [filingStatus, setFilingStatus] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [dependents, setDependents] = useState<string>('');
  const [students, setStudents] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      filingStatus: 'single',
      income: Number(income),
      age: Number(age),
      dependents: Number(dependents),
      students: Number(students),
      zipCode: zipCode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset>
        <legend className="text-base font-medium text-gray-900">Filing Status</legend>
        <div className="mt-4 space-y-4">
          {filingStatusOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name="filingStatus"
                type="radio"
                value={option.value}
                checked={filingStatus === option.value}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      
      {/* Income Input */}
      <div>
        <label htmlFor="income">Income:</label>
        <input
          type="number"
          id="income"
          name="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          min="0" // Income cannot be negative
          className="text-black"
        />
      </div>
      
      {/* Age Input */}
        <div>
            <label htmlFor="age">Age:</label>
            <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18" // Set minimum age requirement for example
                required // Makes the field mandatory
                className="mt-1 block w-full text-black"
            />
        </div> 
      
      {/* Number of Dependents */}
      <div>
        <label htmlFor="dependents">Number of Dependents:</label>
        <input
          type="number"
          id="dependents"
          name="dependents"
          value={dependents}
          onChange={(e) => setDependents(e.target.value)}
          required
          className="text-black"
        />
      </div>
      
      {/* Number of Students */}
      <div>
        <label htmlFor="students">Students in College:</label>
        <input
          type="number"
          id="students"
          name="students"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          required
          className="text-black"
        />
      </div>
      
      {/* Zip Code */}
      <div>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          pattern="\d{5}" // Simple validation for US zip codes
          title="Five digit zip code"
          className="text-black"
        />
      </div>
      
      {/* Submit Button */}
      <div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Calculate Impact
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
