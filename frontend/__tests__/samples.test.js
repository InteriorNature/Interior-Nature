describe('sample test 101', () => {
   it('Variable Equivalents pass', () => {
   	const age=100;
   	expect(age).toEqual(100);
   });

   it('Range Checks pass', () => {
   	 const age=200;
   	 expect(age).toBeGreaterThan(100);
   	 expect(age).toBeLessThan(999);
   });
   it.only('Array Checks pass', () => {
     const dogs = ['snickers', 'hugo'];
     expect(dogs).toEqual(dogs);
     expect(dogs).toContain('snickers');
   });
});