import React, { useRef, useState } from "react";
import Popup from 'reactjs-popup';
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import StateButton from '../../Components/StateButton';
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { ME } from "../../SharedQueries";
import { Setting } from "../../Components/Icons";
import "../../Styles/PopUp.css";
import { useQuery } from "react-apollo-hooks";

const Users = styled.ul`
  margin-top:10px;
`;

const User = styled.li`
  margin-bottom:10px;
  span{
    margin-right:5px;
  }
  display : flex;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const Div = styled.div`
width : 60px;
align-items: right; 
text-align:right;
margin-left:auto;
 `;

const Text2 = styled.div`
justify-content: center;
text-align: center;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;
const NameDiv = styled.div`
width: 200px;
    overflow: hidden;
`;
const Username = styled.span`
  font-size: 26px;
  display: block;
`;
const Button1 = styled.span`
  cursor: pointer;
`;
const IconDiv = styled.div``;
const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  text-align: center;
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
  cursor: pointer;
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const FullNameF = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  width: 90px;
  overflow: hidden;
  height: 13px
`;

const UserDetail = styled.div`
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data, logOut, changeClick }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading) {
    const { data: { me } } = useQuery(ME);
    // useEffect(() => { return refetch(); }, [])
    const [editProfile, setEditProfile] = useState(false);
    const editClick = (e) => {
      setEditProfile(e => !e)
    }
    const {
      seeUser: {
        id,
        avatar,
        firstName,
        lastName,
        isFollowing,
        isFollowers,
        isSelf,
        bio,
        followers,
        following,
        followingCount,
        followersCount,
        postsCount,
        posts,
        username,
        state
      }
    } = data;

    const [userInfo, setUserInfo] = useState({
      username,
      avatar,
      firstName,
      lastName,
      bio,
    });
    console.log(username, isFollowing, state, me.username, isFollowers)
    // !editProfile ?
    //   (
    return (<Wrapper>
      <Helmet>
        <title>{username} | Semicolon</title>
      </Helmet>
      <Header>
        <HeaderColumn>
          <Avatar size="lg" url={avatar} />
        </HeaderColumn>
        <HeaderColumn>
          <UsernameRow>
            <NameDiv>
              <Username>{userInfo.username}</Username>{" "}
            </NameDiv>
            <IconDiv>
              <Button1 onClick={() => { editClick() }} >
                <Setting />
              </Button1>
            </IconDiv>

          </UsernameRow>
          <Counts>
            <Count>
              <FatText text={String(postsCount)} /> <UserDetail>posts</UserDetail>
            </Count>
            <Count>
              <FatText text={String(followersCount)} /> {FollowerPopUp(followers)}
            </Count>
            <Count>
              <FatText text={String(followingCount)} /> {FollowingPopUp(following)}
            </Count>

          </Counts>
          <FullName text={userInfo.firstName + userInfo.lastName} />
          <Bio>{userInfo.bio}</Bio>
          {isSelf ? <Button onClick={logOut} text="Log Out" /> : <FollowButton isFollowing={isFollowing} id={id} />}
          {isSelf ? <StateButton state={state} /> : null}
        </HeaderColumn>
      </Header>
      {username === me.username || state === "1" || (state === "2" && isFollowing) ? (<Posts>
        {posts && posts.map(post => {
          if (post.state === "1") {
            return <SquarePost
              key={post.id}
              postid={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          }
        })}
      </Posts>) :
        <Text2>
          <FatText text="비공개 계정입니다."></FatText>
        </Text2>
      }

    </Wrapper>
    );

  }
  return null;
};
// ) : (<EditProfile data={data.seeUser} setUserInfo={setUserInfo} userInfo={userInfo} setEditProfile={setEditProfile} />
//           )

const FollowerPopUp = (followers) => {
  const ref = useRef();

  return (
    <div>
      <Popup
        className={"fpopup"}
        ref={ref}
        trigger={
          <Count>
            followers
          </Count>
        }
      >
        <div width="30%">
          {followers && (
            <Users>
              {followers.map(follower => (
                <User key={follower.id}>
                  <Avatar url={follower.avatar} />
                  <UserDetail>
                    <FatText text={follower.username} />
                    <FullNameF>{follower.fullName}</FullNameF>
                  </UserDetail>
                  <Div> <FollowButton isFollowing={follower.isFollowing} id={follower.id} /></Div>
                </User>
              ))}
            </Users>
          )}
        </div>
      </Popup>
    </div>
  );
};

const FollowingPopUp = (following) => {
  const ref = useRef();

  return (
    <div>
      <Popup
        className={"fpopup"}
        ref={ref}
        trigger={
          <Count>
            following
          </Count>
        }
      >
        {following && (
          <Users>
            {following.map(following => (
              <User key={following.id}>
                <Avatar url={following.avatar} />
                <UserDetail>
                  <FatText text={following.username} />
                  <FullNameF>{following.fullName}</FullNameF>
                </UserDetail>
                <Div><FollowButton isFollowing={following.isFollowing} id={following.id} /></Div>

              </User>
            ))}
          </Users>
        )}
      </Popup>
    </div>
  );
};