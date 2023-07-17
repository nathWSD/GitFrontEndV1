import '@testing-library/jest-dom';

describe('Component', () => {
  it('should set state variables correctly on mount', () => {
    const queryParamsMock = {
      get: jest.fn().mockImplementation((param) => {
        if (param === 'city') return 'New York';
        if (param === 'actualStation') return 'Station A';
        if (param === 'image') return 'image-url';
        return null;
      }),
    };

    expect(mockNavigate).toHaveBeenCalledWith('/BoardUser', {
      state: {
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        image: 'image-url',
        reservationDateStart: expect.any(String),
        reservationTimeStart: expect.any(String),
        reservationDateEnd: null,
        reservationTimeEnd: null,
        location: 'New York',
        actualStation: 'Station A',
        carId: expect.any(String),
      },
    });

    expect(mockToast).toHaveBeenCalledWith('Reservation success.', { autoClose: 3000 });

    useStateSpy.mockRestore();
    useEffectSpy.mockRestore();
  });

});
