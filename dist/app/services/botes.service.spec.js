"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/common/http/testing");
const botes_service_1 = require("./botes.service");
const environment_1 = require("../../environments/environment");
describe('BotesService', () => {
    let service;
    let httpMock;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [botes_service_1.BotesService]
        });
        service = testing_1.TestBed.inject(botes_service_1.BotesService);
        httpMock = testing_1.TestBed.inject(testing_2.HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should get botes data', () => {
        const mockBotes = {
            primitiva: '1000000',
            bonoloto: '2000000',
            euromillones: '3000000',
            gordo: '4000000',
            nacional: '300000' // Añadido valor para nacional
        };
        service.getBotes().subscribe(botes => {
            expect(botes).toEqual(mockBotes);
        });
        const req = httpMock.expectOne(`${environment_1.environment.apiUrl}botes.json`);
        expect(req.request.method).toBe('GET');
        req.flush(mockBotes);
    });
    it('should handle error', () => {
        service.getBotes().subscribe(botes => {
            expect(botes).toEqual({
                primitiva: '0',
                bonoloto: '0',
                euromillones: '0',
                gordo: '0',
                nacional: '0' // Añadido valor para nacional
            });
        });
        const req = httpMock.expectOne(`${environment_1.environment.apiUrl}botes.json`);
        req.error(new ErrorEvent('Network error'));
    });
});
