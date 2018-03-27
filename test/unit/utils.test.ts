import mocha = require('mocha');
import chai = require('chai');
const expect = chai.expect;

import * as util from '../../src/utils';

describe('utils', function () {
    describe('isNil', function () {
        it('should check for null and undefined', function () {
            expect(util.isNil(null)).to.be.true;
            expect(util.isNil(undefined)).to.be.true;
            expect(util.isNil(false)).to.be.false;
            expect(util.isNil(true)).to.be.false;
            expect(util.isNil(1234)).to.be.false;
            expect(util.isNil("Test")).to.be.false;
            expect(util.isNil({})).to.be.false;
        });
    });

    describe('clamp', function () {
        it('should clamp a value to a numeric range', function () {
            expect(util.clamp(42, 0, 100)).to.equal(42);
            expect(util.clamp(200, 0, 100)).to.equal(100);
            expect(util.clamp(-1, 0, 100)).to.equal(0);
            expect(util.clamp(0, 0, 100)).to.equal(0);
            expect(util.clamp(100, 0, 100)).to.equal(100);
        });
    });

    describe('defaultsDeep', function () {
        it('should replace values of object without nesting', function () {
            let options: any = {
                enabled: true,
                test: 1234,
                testNull: null
            };

            expect(util.defaultsDeep(options, {
                enabled: false,
                test: 1,
                testNull: "Not Null",
                additionalVariable: "A Test string"
            })).to.deep.equal({
                enabled: true,
                test: 1234,
                testNull: null,
                additionalVariable: "A Test string"
            });

            expect(options).to.deep.equal({
                enabled: true,
                test: 1234,
                testNull: null,
                additionalVariable: "A Test string"
            });
        });

        it('should replace values of object with nesting', function () {
            const timestamp = new Date();
            let options: any = {
                enabled: true,
                test: 1234,
                testNull: null,
                someValuesPresent: {
                    test: timestamp
                }
            };

            expect(util.defaultsDeep(options, {
                enabled: false,
                test: 1,
                testNull: "Not Null",
                additionalVariable: "A Test string",
                someValuesPresent: {
                    test: new Date(),
                    test2: 1234,
                    test3: timestamp
                },
                notPresent: {
                    test: "Test"
                }
            })).to.deep.equal({
                enabled: true,
                test: 1234,
                testNull: null,
                additionalVariable: "A Test string",
                someValuesPresent: {
                    test: timestamp,
                    test2: 1234,
                    test3: timestamp
                },
                notPresent: {
                    test: "Test"
                }
            });

            expect(options).to.deep.equal({
                enabled: true,
                test: 1234,
                testNull: null,
                additionalVariable: "A Test string",
                someValuesPresent: {
                    test: timestamp,
                    test2: 1234,
                    test3: timestamp
                },
                notPresent: {
                    test: "Test"
                }
            });
        });
    });
});