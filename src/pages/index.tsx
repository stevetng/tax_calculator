// src/pages/index.tsx
import React, { useState } from 'react';
import Header from '@components/Header';
import UserInfoForm from '@components/UserInfoForm';
import CandidateComparison from '@components/CandidateComparison';
import Footer from '@components/Footer';

interface UserInfo {
  filingStatus: 'single' | 'marriedFilingJointly';
  income: number;
  age: number;
  dependents: number;
  students: number;
  zipCode: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    filingStatus: 'single',
    income: 0,
    age: 0,
    dependents: 0,
    students: 0,
    zipCode: '',
  });

  const handleUserInfoSubmit = (formValues: UserInfo) => {
    setUserInfo(formValues);
  };

  return (
    <div>
      <Header />
      <main>
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
        <CandidateComparison userInfo={userInfo} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
