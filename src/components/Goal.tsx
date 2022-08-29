import React from "react";
import StyledGoal from "../styles/StyledGoal";
import StyledCheckBox from "../styles/StyledCheckBox";
import StyledGoalDetails from "../styles/StyledGoalDetails";
import * as Airtable from 'airtable';

interface PropTypes{
  goal: Airtable.Record<Airtable.FieldSet>,
  updates: Airtable.Records<Airtable.FieldSet>
}

const Goal = ({goal, updates } : PropTypes) => {
  return (
    <StyledGoal>
      <StyledCheckBox>
        {" "}
        <input type="checkbox" defaultChecked={Boolean(goal.fields.complete)} disabled />
        <span />
      </StyledCheckBox>
      <h2>{goal.fields.title as string}</h2>
      <StyledGoalDetails>
        <h3>DETAILS</h3>
        <p>{goal.fields.details as string}</p>
        <h3>UPDATES</h3>
        {updates.map((update, index) => (
          <p key={index}>{update.fields.update as string}</p>
        ))}
      </StyledGoalDetails>
    </StyledGoal>
  );
};

export default Goal;
