using Microsoft.EntityFrameworkCore.Migrations;

namespace Database.Migrations.Ef
{
    public partial class WorkplanChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryInfo_WorkPlan_WorkPlanId",
                table: "HistoryInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_Multimedia_WorkPlan_WorkPlanId",
                table: "Multimedia");

            migrationBuilder.DropTable(
                name: "WorkPlanElement");

            migrationBuilder.DropTable(
                name: "WorkPlanInstruction");

            migrationBuilder.DropIndex(
                name: "IX_Multimedia_WorkPlanId",
                table: "Multimedia");

            migrationBuilder.DropIndex(
                name: "IX_HistoryInfo_WorkPlanId",
                table: "HistoryInfo");

            migrationBuilder.DropColumn(
                name: "WorkPlanId",
                table: "Multimedia");

            migrationBuilder.DropColumn(
                name: "WorkPlanId",
                table: "HistoryInfo");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "WorkPlan",
                newName: "Username");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "WorkPlan",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "WorkPlan",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "WorkPlan");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "WorkPlan",
                newName: "Street");

            migrationBuilder.AlterColumn<int>(
                name: "PhoneNumber",
                table: "WorkPlan",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkPlanId",
                table: "Multimedia",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkPlanId",
                table: "HistoryInfo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkPlanElement",
                columns: table => new
                {
                    key = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkPlanId = table.Column<int>(type: "int", nullable: true),
                    X = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Y = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlanElement", x => x.key);
                    table.ForeignKey(
                        name: "FK_WorkPlanElement_WorkPlan_WorkPlanId",
                        column: x => x.WorkPlanId,
                        principalTable: "WorkPlan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkPlanInstruction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Element = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkPlanId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlanInstruction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkPlanInstruction_WorkPlan_WorkPlanId",
                        column: x => x.WorkPlanId,
                        principalTable: "WorkPlan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Multimedia_WorkPlanId",
                table: "Multimedia",
                column: "WorkPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryInfo_WorkPlanId",
                table: "HistoryInfo",
                column: "WorkPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPlanElement_WorkPlanId",
                table: "WorkPlanElement",
                column: "WorkPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPlanInstruction_WorkPlanId",
                table: "WorkPlanInstruction",
                column: "WorkPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryInfo_WorkPlan_WorkPlanId",
                table: "HistoryInfo",
                column: "WorkPlanId",
                principalTable: "WorkPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Multimedia_WorkPlan_WorkPlanId",
                table: "Multimedia",
                column: "WorkPlanId",
                principalTable: "WorkPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
