import axios from "axios";
import dotenv from "dotenv";
import type { IndividualSessionResult } from "../shared/interface/sessionResult";

dotenv.config();

export async function getSessionResult() {
  const externalCalculationServerURL = process.env.EXTERNAL_CALC_SERVER_API;
  const companyKey = process.env.COMPANY_KEY;
  const url = `${externalCalculationServerURL}/api/v1/game/results/${companyKey}`;

  try {
    const response = await axios.get(url);
    console.log("Company Results \n");

    return response.data;
  } catch (error) {
    console.log(`Error from 'getCompanyResultsCalculations': ${(error as Error)?.message}`);
  }
}

export async function getDynamicGameResult(dynamicGameSessionId: string): Promise<IndividualSessionResult | undefined> {
  const externalCalculationServerURL = process.env.EXTERNAL_CALC_SERVER_API;
  const companyKey = process.env.COMPANY_KEY;
  const url = `${externalCalculationServerURL}/api/v1/game/results/dynamic/${companyKey}/${dynamicGameSessionId}`;

  try {
    const response = await axios.get<{ error: boolean; message: string; data: IndividualSessionResult }>(url);

    return response.data.data;
  } catch (error) {
    console.log(`Error from 'getCompanyResultsCalculations': ${(error as Error)?.message}`);
  }
}
