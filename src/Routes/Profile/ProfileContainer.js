import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
  user{
         id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postCount
    }
    posts{
    id
    likeCount
    commentCount
      files{
        id
        url
      }
    
    }  
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut{
  logUserOut @client
  }
`;

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const [logOut] = useMutation(LOG_OUT);
  return <ProfilePresenter loading={loading} data={data} logUserOut={logOut} />;
});