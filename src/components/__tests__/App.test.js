

it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders Account header", () => {
    const wrapper = shallow(<App />);
    const welcome =  <h3>let us plan a your movement together...</h3>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });