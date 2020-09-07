import chai from 'chai';
import app from '../src/app';
import chaiHttp from 'chai-http';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Validate DNA payload.', () => {
  it('validates if DNA payload exists.', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal('DNA is missing :( .');
        done();
      });
  });

  it('validates if DNA payload is array.', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal('DNA is missing array :( .');
        done();
      });
  });

  it('validates if DNA payload is array not empty.', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: [],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal('DNA cannot be empty :( .');
        done();
      });
  });

  it('validates if DNA payload is chart square.', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: ['ATGC', 'AGCT', 'ATGT'],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal(
          'DNA is missing chart square :( .'
        );
        done();
      });
  });
});

describe('Validate DNA content payload.', () => {
  it('validates DNA if all content is string.', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: ['GATGCA', 1000, 'TTATGT', 'AGATGG', 'CGACTA', 'TCACTG'],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal(
          'DNA combination (1000) on line 2 must be string :( .'
        );
        done();
      });
  });

  it('validates DNA if all content is contained in [A, T, C, G].', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: ['GATGCA', 'TTABTGT', 'TTATGT', 'AGATGG', 'CGACTA', 'TCACTG'],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal(
          'the DNA combination letter (TTABTGT -> B) passed in line 2 must be nitrogenous :( .'
        );
        done();
      });
  });

  it('validates if content is square', (done) => {
    chai
      .request(app)
      .post('/simian')
      .send({
        dna: ['GATGCAT', 'TTABTGT', 'TTATGT', 'AGATGG', 'CGACTA', 'TCACTG'],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('string');
        expect(res.body.message).to.be.equal(
          'the DNA combination in line 1 must be square :( .'
        );
        done();
      });
  });
});

// describe('POST API', () => {
//   it('Check DNA is human - POST /simian', (done) => {
//     chai
//       .request(app)
//       .post('/simian')
//       .send({
//         dna: ['GATGCA', 'CTGTGC', 'TTATGT', 'AGATGG', 'CGACTA', 'TCACTG'],
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(403);
//         expect(res.body).to.be.a('object');
//         expect(res.body.simian).to.be.an('boolean');
//         expect(res.body.simian).to.be.equal(false);
//         done();
//       });
//   });
// });
