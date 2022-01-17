import React from 'react';
import { addDays, format, isWeekend } from 'date-fns';
import { useState } from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';


// class MyComponent extends React.Component {
function Calendar() {

  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: 'selection1'
    },
    selection2: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: 'selection2'
    }
  });

  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  function customDayContent(day: any) {
    let extraDot = null;
    if (isWeekend(day)) {
      // extraDot = (
      //   <div
      //     style={{
      //       height: "5px",
      //       width: "5px",
      //       borderRadius: "100%",
      //       background: "red",
      //       position: "absolute",
      //       top: 2,
      //       right: 2,
      //     }}
      //   >
      //   </div> 
      // )
    } else {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "green",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        >
        </div> 
      )
    }
    return (
      <div>
        {extraDot}
        {isWeekend(day) && 
          <span style={{color: '#b0bec5', pointerEvents: 'none'}}>{format(day, "d")}</span>
        } 
        {!isWeekend(day) &&  
          <span>{format(day, "d")}</span>
        }
      </div>
    )
  }


  return (
    <DateRangePicker
      // ranges={[selectionRange]}
      // onChange={handleSelect}
      ranges={[state.selection1]}
      onChange={(item: any) => setState({ ...state, ...item })}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      dayContentRenderer={customDayContent}
      // disabledDates={this.props.disabledDates.map((d) => new Date(d))}
    />
  )
}
export default Calendar;

// const [state, setState] = useState({
//   selection1: {
//     startDate: addDays(new Date(), -6),
//     endDate: new Date(),
//     key: 'selection1'
//   },
//   selection2: {
//     startDate: addDays(new Date(), 1),
//     endDate: addDays(new Date(), 7),
//     key: 'selection2'
//   }
// });

{/* <DateRangePicker
  // onChange={(item: any) => setState({ ...state, ...item })}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={[state.selection1, state.selection2]}
  direction="horizontal"
  // dayContentRenderer={customDayContent}
  ariaLabels={{
    dateInput: {
      selection1: { startDate: "start date input of selction 1", endDate: "end date input of selction 1" },
      selection2: { startDate: "start date input of selction 2", endDate: "end date input of selction 2" }
    },
    monthPicker: "month picker",
    yearPicker: "year picker",
    prevButton: "previous month button",
    nextButton: "next month button",
  }}
/>; */}