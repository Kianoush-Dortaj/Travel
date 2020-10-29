import { check } from 'express-validator';
import { SubscribeModel } from './../../database/model/Subscribe';

export default new class SubscribeValidation {


    Create() {
        return [
          check("name").notEmpty().withMessage("نام کد تخفیف نمیتواند خالی باشد"),
          check("percent")
            .notEmpty()
            .withMessage(" درصد کد تخفیف نمیتواند خالی باشد"),
          check("startDate")
            .notEmpty()
            .withMessage(" تاریخ شروع کد تخفیف نمیتواند خالی باشد"),
            // .isDate()
            // .withMessage("یک تاریخ معتبر برای تاریخ شروع کد تخفیف وارد کنید"),
          check("expireDate")
            .notEmpty()
            .withMessage(" تاریخ انقضا کد تخفیف نمیتواند خالی باشد")
            // .isDate()
            // .withMessage("یک تاریخ معتبر برای تاریخ انقضا کد تخفیف وارد کنید"),
        ];
      }
    
      Update() {
        return [
          check("id").notEmpty().withMessage("شناسه کد تخفیف نمیتواند خالی باشد"),
          check("name").notEmpty().withMessage("نام کد تخفیف نمیتواند خالی باشد"),
          check("percent")
            .notEmpty()
            .withMessage(" درصد کد تخفیف نمیتواند خالی باشد"),
          check("startDate")
            .notEmpty()
            .withMessage(" تاریخ شروع کد تخفیف نمیتواند خالی باشد"),
            // .isDate()
            // .withMessage("یک تاریخ معتبر برای تاریخ شروع کد تخفیف وارد کنید"),
          check("expireDate")
            .notEmpty()
            .withMessage(" تاریخ انقضا کد تخفیف نمیتواند خالی باشد")
            // .isDate()
            // .withMessage("یک تاریخ معتبر برای تاریخ انقضا کد تخفیف وارد کنید"),
        ];
      }
    
      Delete() {
        return [
          check("id")
            .notEmpty()
            .withMessage("شناسه کد تخفیف مورد نظر نا معتبر میباشد"),
        ];
      }

}