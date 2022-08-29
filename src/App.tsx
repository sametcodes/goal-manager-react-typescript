import React, { useEffect, useState } from "react";
import Airtable, { FieldSet } from "airtable";
import Goal from "./components/Goal";
import styled from "styled-components";
import { GlobalStyle } from "./styles/Global.style";

const base = new Airtable({ apiKey: "key2noOcMp4dNFFYS" }).base("appbLCIbz7n3hF1pB");

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 1rem 0;
`;

const App: React.FC = () => {
  const [goals, setGoals] = useState<Airtable.Records<FieldSet>>([]);
  const [updates, setUpdates] = useState<Airtable.Records<FieldSet>>([]);

  const fetchGoals = () => {
    base("goals")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage): any => {
        setGoals(records);
        fetchNextPage();
      });
  }
  const fetchUpdates: any = (): any => {
    base("updates")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setUpdates(records);
        fetchNextPage();
      });
  }

  useEffect(() => {
    fetchGoals();
    fetchUpdates();
    return () => {
      setGoals([]);
      setUpdates([])
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <StyledH1>My Goals</StyledH1>
      {goals.map(goal => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(
            (update) => update.fields.goal instanceof Array && update.fields.goal[0] === goal.id
          )}
        />
      ))}
    </>
  );
}

export default App;
