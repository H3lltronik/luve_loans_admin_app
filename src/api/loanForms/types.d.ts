interface LoanForm {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  seqId: number;
  name: string;
}

type MeResponse = LoanForm;

type GetLoanFormsResponse = {
  data: LoanForm[];
  pagination: Pagination;
};

type GetLoanFormResponse = LoanForm;
type UpdatedLoanFormResponse = LoanForm;
type DeleteLoanFormResponse = LoanForm;

type LoanFormCreatedResponse = LoanForm;

type CreateLoanFormRequest = Omit<LoanForm, "id">;

// parsed
type LoanFormWithStatus = LoanForm & { status: string };
type LoanFormsWithStatus = LoanFormWithStatus[];
type GetLoanFormsResponseWithStatus = {
  data: LoanFormsWithStatus;
  pagination: Pagination;
};
