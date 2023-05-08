const getCar = require('./car');

test('should return car with id 1', () => {
  const req = { params: { id: 1 } };
  const res = { json: jest.fn() };
  const next = jest.fn();

  getCar(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    cars_info: '2023 Toyota GR Supra',
    cars_description: 'Body style: Coupe 0-60 mph: 5.1 to 6.3 seconds Bore: 3.2″ Cargo volume: 10.2 ft³ Compression ratio: 10.2 Engine cylinder configuration: Straight engine',
    img: 'https://www.cnet.com/a/img/resize/83b544d968b36e5e77e8b7eec600092e87ed4394/hub/2022/09/05/1b6db5e5-bed7-4b60-bc5c-88a330792bd2/2023-toyota-supra-manual-001.jpg?auto=webp&fit=crop&height=675&width=1200'
  });
});
