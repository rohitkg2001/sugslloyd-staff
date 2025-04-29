import moment from "moment";

export const useFilterTasks = (tasks, searchQuery, dateFilter) => {
  return tasks.filter((task) => {
    if (!task || !task.start_date) return false; // Ensure task has a start_date

    const query = searchQuery.toLowerCase();
    const taskStartDate = moment(task.start_date, "YYYY-MM-DD"); // Ensure correct format

    const matchesSearch =
      task.site?.breda_sl_no?.toLowerCase().includes(query) ||
      task.site?.site_name?.toLowerCase().includes(query) ||
      task.activity?.toLowerCase().includes(query);

    if (dateFilter?.type === "Today") {
      return matchesSearch && taskStartDate.isSame(moment(), "day");
    } else if (dateFilter?.type === "This Month") {
      return matchesSearch && taskStartDate.isSame(moment(), "month");
    } else if (dateFilter?.type === "Custom") {
      return (
        matchesSearch &&
        taskStartDate.isBetween(
          moment(dateFilter.startDate),
          moment(dateFilter.endDate),
          "day",
          "[]"
        )
      );
    }

    return matchesSearch;
  });
};
