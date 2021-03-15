import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentPerson } from '../../store/person/actions';
import Loader from '../base/Loader';
import Container from '../base/Container';
import PersonCard from '../PersonCard';

const Person = ({
  person,
  fetchCurrentPerson,
  match,
}) => {
  useEffect(() => {
    const id = match.params.id;

    fetchCurrentPerson(id);
  }, [match.params.id]);

  useEffect(() => {
    console.log(person);
  }, [person]);

  return (
    <>
      { person ? (
        <div className="pb-60-resp">
          <Container
            theme={['withTitle']}
            title={person.name}
            customClass="base-container mt-60-resp mb-30"
          >
          <PersonCard
            person={person}
          />
          </Container>
        </div>
      ) : (
        <div className="base-container">
          <div className="full-screen-with-header-and-footer padding-20 content-centered">
            <Loader color="pattern" />
          </div>
        </div>
      ) }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    person: state.person.currentPerson,
  };
}

const mapDispatchToProps = {
  fetchCurrentPerson,
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
