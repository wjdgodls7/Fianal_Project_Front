import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { ME } from "../../SharedQueries";
import { useState } from "react";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      firstName
      lastName
      isFollowing
      isFollowers
      isSelf
      state
      bio
      followers {
        fullName
        id
        isFollowing
        username
        avatar
      }
      following {
        fullName
        id
        isFollowing
        username
        avatar
      }
      followingCount
      followersCount
      postsCount
      posts {
        state
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
}`

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading, refetch } = useQuery(GET_USER, { variables: { username } });
  const [logOut] = useMutation(LOG_OUT);
  const [change, setChange] = useState("전체공개");
  const changeClick = (change) => {
    if (change === "전체공개") {
      setChange("친구만 공개");
    } else {
      setChange("전체공개");
    }
  }
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} refetch={refetch} changeClick={changeClick} />;
});