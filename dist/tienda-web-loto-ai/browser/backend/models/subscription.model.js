"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanType = exports.PaymentStatus = exports.SubscriptionStatus = void 0;
// Enums para los estados
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["INACTIVE"] = "inactive";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["SUCCEEDED"] = "succeeded";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["CANCELED"] = "canceled";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PlanType;
(function (PlanType) {
    PlanType["BASIC"] = "basic";
    PlanType["MONTHLY"] = "monthly";
    PlanType["PRO"] = "pro";
})(PlanType || (exports.PlanType = PlanType = {}));
