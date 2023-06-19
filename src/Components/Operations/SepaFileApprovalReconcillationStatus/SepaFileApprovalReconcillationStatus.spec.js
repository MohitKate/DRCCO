import { render, fireEvent , screen} from '@testing-library/react';
import renderer from 'react-test-renderer';

import {Route, Router, Routes,MemoryRouter} from 'react-router-dom';
import SepaFileApprovalReconcillationStatus from './SepaFileApprovalReconcillationStatus'
import { createMemoryHistory } from 'history';

describe('SepaFileApprovealReconcillationStatus', () => {
  it('should call selectFileType when dropdown value changes', () => {
    const selectFileType = jest.fn();
    const { getByTestId } = render(
      <div>
        <select
          onChange={(e) => selectFileType(e.target.value)}
          value="PAIN_008"
          data-testid="select-element-test-id"
        >
          <option value="PAIN_008">PAIN_008</option>
          <option value="PAIN_001_001_03">PAIN_001_001_03</option>
          <option value="CAMT_054_001_08">CAMT_054_001_08</option>
          <option value="CAMT_054_002_08">CAMT_054_002_08</option>
        </select>
      </div>
    );

    fireEvent.change(getByTestId('select-element-test-id'), {
      target: { value: 'PAIN_001_001_03' },
    });

    expect(selectFileType).toHaveBeenCalledTimes(1);
    expect(selectFileType).toHaveBeenCalledWith('PAIN_001_001_03');
  });



  it('renders the component correctly', () => {
    const { getByTestId } = render(
      <MemoryRouter>

        <SepaFileApprovalReconcillationStatus/>
      </MemoryRouter>
    )
    const component = getByTestId('sepa-file-approval-reconciliation-status');

    // Assertions to check that the component renders correctly
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass('sepa-file-approval-reconciliation-status');
    
    // You can also check for child elements or props here
  });


  it('displays the correct data', () => {
    const data = 'Operations/ SepaFile Approval and Reconcile Status';
    const { getByText } = render(
      <MemoryRouter>

        <SepaFileApprovalReconcillationStatus data={data} />
        </MemoryRouter>
        );
      
    const dateElement = getByText(data);
    expect(dateElement).toBeInTheDocument();
  });


});
