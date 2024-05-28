import React from 'react';
import CreateGroup from './CreateGroup';
import GroupActions from './GroupActions';
import CreateGroupPost from './CreateGroupPost';
import GroupPostList from './GroupPostList';

const GroupPage = ({ groupId }) => {
  return (
    <div className="p-4">
      <CreateGroup />
      <GroupActions groupId={groupId} />
      <CreateGroupPost groupId={groupId} />
      <GroupPostList groupId={groupId} />
    </div>
  );
};

export default GroupPage;
