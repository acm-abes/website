import React from "react";

interface Params {
  params: {
    name: string;
  };
}

const Member = ({ params: { name } }: Params) => {
  return <div>Member</div>;
};

export default Member;
