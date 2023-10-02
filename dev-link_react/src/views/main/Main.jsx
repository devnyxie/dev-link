import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Team from '../../components/Team';
import { getTeams } from '../../Redux/Actions/teams';
import { getDay, getTime } from '../../globalActions';

function Main({ teams }) {
  const dispatch = useDispatch();

  const [startingPoints, setStartingPoints] = useState([]);

  useEffect(() => {
    dispatch(getTeams({ offset: 0, limit: 10 }));
  }, []);

  useEffect(() => {
    //get heights of both widgets to give them the same height
    const div1 = document.querySelector('.div1');
    const div2 = document.querySelector('.div2');
    if (div1 && div2) {
      const height = div1.clientHeight;
      div2.style.height = height + 'px';
    }

    // Timeline
    function getStartingPoints() {
      const parentDiv = document.getElementById('parentDiv');
      const topStartingPoints = [];
      for (var index = 0; index < teams.length; index++) {
        const css_class = `.team-${index}`;
        var teamElement = document.querySelector(css_class);

        if (teamElement) {
          // Get the bounding client rect of the team element relative to the parentDiv
          var rectRelativeToParent = teamElement.getBoundingClientRect();
          var topPositionRelativeToParent =
            rectRelativeToParent.top - parentDiv.getBoundingClientRect().top;

          topStartingPoints.push({
            index: index,
            topPosition: topPositionRelativeToParent,
          });
        } else {
          break;
        }
      }
      setStartingPoints(topStartingPoints);
    }
    getStartingPoints();
  }, [teams]);

  return (
    <div className="w-100 d-flex" style={{ height: 'max-content' }}>
      <div
        className="div1"
        id="parentDiv"
        style={{ width: '100%', height: 'max-content' }}
      >
        <div className="">
          {teams.map((team, index) => {
            return <Team team={team} key={index} index={index} />;
          })}
        </div>
      </div>
      <div
        className="m-2 me-3 div2 position-relative d-none d-md-block"
        style={{ width: '10%' }}
      >
        <div
          className="position-relative fade-bottom"
          style={{
            width: '1px',
            backgroundColor: '#272c31',
            height: '100%',
            left: '50%',
          }}
        >
          {startingPoints.map((point, index) => {
            return (
              <div
                key={index}
                className="position-absolute d-flex border rounded-circle"
                style={{
                  left: '50%',
                  right: '50%',
                  transform: 'translate(-50%,-50%)',
                  top: `${point.topPosition}px`,
                  height: '10px',
                  width: '10px',
                  backgroundColor: '#272c31',
                }}
              >
                <div
                  className="position-relative"
                  style={{
                    left: '50%',
                    right: '50%',
                    transform: 'translate(-50%,-0%)',
                  }}
                >
                  <div
                    className="d-flex justify-content-between"
                    style={{
                      opacity: 0.5,
                      position: 'absolute',
                      width: '90px',
                      top: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  >
                    <div style={{ textAlign: 'left' }} className="w-100 h-100">
                      <small>{getDay(teams[point.index].created_at)}</small>
                    </div>
                    <div style={{ textAlign: 'right' }} className="w-100 h-100">
                      <small>{getTime(teams[point.index].created_at)}</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
