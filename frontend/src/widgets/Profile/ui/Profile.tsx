import { UsersApi } from "src/shared/store/users/api/usersApi";
import { useEffect, useState } from "react";
import { UserProfile } from "./types";
import styled from "styled-components";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";

export const Profile = observer(() => {
  const [me, setMe] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access");
      if (accessToken) {
        try {
          const response = await UsersApi.getDataAboutMe(accessToken);
          setMe(response.data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <ProfileWrapper>
      <ProfileCard>
        <ProfileHeader>Страница профиля</ProfileHeader>
        <ProfileDetails>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              {me && (
                <>
                  <ProfileItem>
                    <PropertyName>Никнейм:</PropertyName>
                    <PropertyValue>{me.username}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Имя:</PropertyName>
                    <PropertyValue>{me.first_name}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Фамилия:</PropertyName>
                    <PropertyValue>{me.last_name}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Почта:</PropertyName>
                    <PropertyValue>{me.email}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Роль:</PropertyName>
                    <PropertyValue>{me.role}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Заработная плата:</PropertyName>
                    <PropertyValue>{me.salary}</PropertyValue>
                  </ProfileItem>
                  <ProfileItem>
                    <PropertyName>Зарплата в час:</PropertyName>
                    <PropertyValue>{me.hour_rate}</PropertyValue>
                  </ProfileItem>
                </>
              )}
            </>
          )}
        </ProfileDetails>
      </ProfileCard>
    </ProfileWrapper>
  );
});

const ProfileWrapper = styled.div`
  padding: 40px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileHeader = styled.h2`
  margin: 0;
  padding: 20px;
  font-size: 24px;
  background: linear-gradient(to right, #f67d37, #ff007e);
  color: #fff;
  text-align: center;
`;

const ProfileDetails = styled.div`
  padding: 20px;
`;

const ProfileItem = styled.p`
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
`;

const PropertyName = styled.span`
  font-weight: bold;
`;

const PropertyValue = styled.span`
  margin-left: 8px;
`;
