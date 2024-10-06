"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import { LegacyRef } from "react";
import logo from "../assets/elearning.png";

export function InvoiceDetailTable({
  contentRef,
}: {
  contentRef: LegacyRef<HTMLDivElement>;
}) {
  return (
    <BoxStyled ref={contentRef}>
      <table>
        <tbody>
          <tr className="top">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td className="title">
                      <Image src={logo} alt="Company logo" />
                    </td>

                    <td>
                      Invoice #: 123
                      <br />
                      Created: January 1, 2023
                      <br />
                      Due: February 1, 2023
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Udemy, Inc.
                      <br />
                      12345 Sunny Road
                      <br />
                      Sunnyville, TX 12345
                    </td>

                    <td>
                      Acme Corp.
                      <br />
                      John seungMeng
                      <br />
                      john@example.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td>Payment Method</td>

            <td>Check #</td>
          </tr>

          <tr className="details">
            <td>Check</td>

            <td>1000</td>
          </tr>

          <tr className="heading">
            <td>Item</td>

            <td>Price</td>
          </tr>

          <tr className="item">
            <td>Website design</td>

            <td>$300.00</td>
          </tr>

          <tr className="item">
            <td>Hosting (3 months)</td>

            <td>$75.00</td>
          </tr>

          <tr className="item last">
            <td>Domain name (1 year)</td>

            <td>$10.00</td>
          </tr>

          <tr className="total">
            <td></td>

            <td>Total: $385.00</td>
          </tr>
        </tbody>
      </table>
    </BoxStyled>
  );
}

const BoxStyled = styled.div`
  max-width: 2000px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
  background-color: #ffffff;
  border-radius: 10px;

  table {
    width: 100%;
    line-height: inherit;
    text-align: left;
    border-collapse: collapse;
    td {
      padding: 5px;
      vertical-align: top;
      :nth-child(2) {
        text-align: right;
      }
    }
    tr.top table td {
      padding-bottom: 20px;
    }
    tr.top table td.title {
      font-size: 45px;
      line-height: 45px;
      color: #333;
    }

    tr.information table td {
      padding-bottom: 40px;
    }
    tr.heading td {
      background: #eee;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }
    tr.details td {
      padding-bottom: 20px;
    }
    tr.item td {
      border-bottom: 1px solid #eee;
    }

    tr.item.last td {
      border-bottom: none;
    }
    tr.total td:nth-child(2) {
      border-top: 2px solid #eee;
      font-weight: bold;
    }
  }
`;
