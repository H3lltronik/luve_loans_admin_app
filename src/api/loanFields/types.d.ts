interface LoanField {
  isDraft: boolean;
  isPublished: boolean;
  name: string;
  label: string;
  type: string;
  notes: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  seqId: number;
}

type MeResponse = LoanField;

type GetLoanFieldsResponse = {
  data: LoanField[];
  pagination: Pagination;
};

type GetLoanFieldResponse = LoanField;
type UpdatedLoanFieldResponse = LoanField;
type DeleteLoanFieldResponse = LoanField;

type LoanFieldCreatedResponse = LoanField;

type CreateLoanFieldRequest = Omit<LoanField, "id">;

// parsed
type LoanFieldWithStatus = LoanField & { status: string };
type LoanFieldsWithStatus = LoanFieldWithStatus[];
type GetLoanFieldsResponseWithStatus = {
  data: LoanFieldsWithStatus;
  pagination: Pagination;
};
